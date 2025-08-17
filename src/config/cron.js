import cron from 'cron';
import https from 'https';

const job = new cron.CronJob("*/14 * * * *", function () {
    try {
        // Get the current server URL dynamically
        const serverUrl = process.env.NODE_ENV === 'production' 
            ? 'https://recipe-app-api-b0p3.onrender.com'
            : `http://localhost:${process.env.PORT || 5001}`;
        
        const healthEndpoint = `${serverUrl}/api/health`;
        
        console.log(`Cron job: Hitting health endpoint at ${healthEndpoint}`);
        
        https.get(healthEndpoint, (res) => {
            if (res.statusCode === 200) {
                console.log(`✅ Health check successful at ${new Date().toISOString()}`);
            } else {
                console.error(`❌ Health check failed with status code: ${res.statusCode}`);
            }
        }).on("error", (e) => {
            console.error(`❌ Cron job error: ${e.message}`);
        });
    } catch (error) {
        console.error(`❌ Unexpected error in cron job: ${error.message}`);
    }
});


export default job;