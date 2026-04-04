/* * עברית:
 * אזהרה: קובץ זה אינו מוכן להפעלה בסביבת ייצור (Production).
 * דפדפנים מודרניים חוסמים בקשות HTTP מתוך אתרים המשתמשים ב-HTTPS (Mixed Content).
 * ה API של http://ip-api.com/ בגרסתו החינמית תומך ב-HTTP בלבד, ולכן ייחסם.
 * יש להשתמש בחיבור מאובטח או ב-API חלופי התומך ב-HTTPS.
 * * English:
 * WARNING: This file is not ready for deployment.
 * Modern browsers block HTTP requests from HTTPS-secured sites (Mixed Content).
 * The http://ip-api.com/ API (free tier) only supports HTTP and will be blocked.
 * Please use a secure connection or an alternative API that supports HTTPS.
 */
/**
 * 
 פונקציה לבדיקת סטטוס הגבלת פעילות וחסימת הדף בהתאם למיקום המשתמש
 */
async function checkShabbatStatus() {
    const ipApiUrl = 'http://ip-api.com/json/';
    const blockMessage = 'הדף אינו פעיל כעת באזורכם';
    const errorMessage = 'לא הצלחנו לברר אם שבת עכשיו';

    try {
        // 1. איתור מיקום המשתמש לפי כתובת ה-IP שלו
        const ipResponse = await fetch(ipApiUrl);
        if (!ipResponse.ok) {
            throw new Error('Failed to fetch location data');
        }
        const locationData = await ipResponse.json();
        
        const lat = locationData.lat;
        const lon = locationData.lon;

        // 2. בניית כתובת ה-API עם הפרמטרים של קו רוחב וקו אורך
        // הוסר הפרמטר geonameid ובמקומו נוספו latitude ו-longitude
        const apiUrl = `https://www.hebcal.com/zmanim?cfg=json&im=1&latitude=${lat}&longitude=${lon}`;

        const response = await fetch(apiUrl, {
            cache: 'no-cache'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // 3. בדיקה האם המועד הנוכחי מוגדר כזמן שבו המלאכה אסורה
        if (data && data.status && data.status.isAssurBemlacha === true) {
            console.log(blockMessage);
            blockPage(blockMessage);
        }

    } catch (error) {
        console.log(errorMessage, error);
    }
}

/**
 * פונקציית עזר ליצירת שכבת החסימה על המסך
 * @param {string} message - ההודעה שתוצג על המסך
 */
function blockPage(message) {
    const overlay = document.createElement('div');
    
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#ffffff';
    overlay.style.color = '#000000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.fontSize = '32px';
    overlay.style.fontFamily = 'Arial, sans-serif';
    overlay.style.fontWeight = 'bold';
    overlay.style.zIndex = '2147483647';
    overlay.style.direction = 'rtl';
    overlay.style.textAlign = 'center';
    overlay.style.padding = '20px';
    overlay.style.boxSizing = 'border-box';
    
    overlay.innerText = message;
    
    document.body.style.overflow = 'hidden';
    document.body.appendChild(overlay);
}

// הפעלת הפונקציה בעת טעינת הסקריפט
checkShabbatStatus();
