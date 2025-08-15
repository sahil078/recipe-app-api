import cron from 'cron';
import https from 'https';

const job = new cron.CronJob("*/14 * * * *", function() {
    https.get(process.env.API_URL, (res) => {
        if(res.statusCode === 200) {
            console.log("Get request Send Successfully");

        }else{
            console.log("Get request Failed" , res.statusCode);
        }
    }).on("error" , (e) => console.log("error While sending request" , e));
})

export default job;