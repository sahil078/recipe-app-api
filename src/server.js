import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { favoriteTable } from "./db/schema.js";
import { db } from "./config/db.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";


const app = express();
const PORT = ENV.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Start cron job only in production
if (ENV.NODE_ENV === "production") {
    console.log("🚀 Starting cron job for production environment");
    job.start();
    console.log("⏰ Cron job scheduled to run every 14 minutes");
} else {
    console.log("🔧 Development mode: Cron job disabled");
}

// Health check endpoint
app.get("/api/health", (req, res) => {
    const timestamp = new Date().toISOString();
    console.log(`🏥 Health check requested at ${timestamp}`);
    
    res.status(200).json({ 
        message: "Server is running", 
        success: true,
        timestamp: timestamp,
        environment: ENV.NODE_ENV || 'development'
    });
});

// Favorites endpoint
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title || !image) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const newFavorite = await db.insert(favoriteTable).values({
       userId, recipeId, title, image, cookTime, servings 
      }).returning();

    res.status(201).json({ message: "Favorite created", success: true , data: newFavorite[0]});

  } catch (error) {
    console.error("Error creating favorite:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});


// delete favorite
app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db.delete(favoriteTable).where(
      and(eq(favoriteTable.userId , userId) , eq(favoriteTable.recipeId , parseInt(recipeId)))
    )
    res.status(200).json({
      message: "favorite remove successfully",
      success: true
    })

  } catch (error) {
    console.error("Error removing favorite:", error);
  }
});

// get all favorites
app.get("/api/favorites/:userId" , async (req , res) => {
  try{

    const {userId} = req.params;

    const userFavorites = await db.select().from(favoriteTable).where(eq(favoriteTable.userId , userId));
    res.status(200).json({userFavorites , success: true});
  }catch(err) {
    console.log("Error fetching all the favorite data"  , err);
    res.status(500).json({
      error: "something went wrong , Unable to fetch Favorites",
      success: false
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error", success: false });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 