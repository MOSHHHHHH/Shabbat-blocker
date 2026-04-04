/**
 * פונקציה לבדיקת סטטוס שבת/חג וחסימת הדף בהתאם
 */
async function checkShabbatStatus() {
    const apiUrl = 'https://www.hebcal.com/zmanim?cfg=json&im=1&geonameid=281184';
    const blockMessage = 'הדף אינו פעיל בשבת\\ימים טובים לפי שעון ירושלים';
    const errorMessage = 'דף זה שומר שבת, אך לא הצלחנו לברר האם שבת עכשיו';

    try {
        const response = await fetch(apiUrl, {
            // מאלץ את הדפדפן לבדוק מול השרת אם חל שינוי,
            // אבל מאפשר לו להשתמש במטמון (304) אם השרת מאשר שהכל זהה.
            cache: 'no-cache'
        });

        // וידוא שהתשובה תקינה
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // בדיקה האם אסור במלאכה (שבת או יום טוב)
        if (data && data.status && data.status.isAssurBemlacha === true) {
            // הדפסה לקונסול
            console.log(blockMessage);

            // חסימת הדף באמצעות הוספת שכבת כיסוי (Overlay)
            blockPage(blockMessage);
        }
        // אם isAssurBemlacha הוא false, הקוד מסתיים ולא עושה כלום.

    } catch (error) {
        // במקרה של שגיאה בבקשה או בפענוח הנתונים
        console.log(errorMessage);
    }
}

/**
 * פונקציית עזר ליצירת שכבת החסימה על המסך
 * @param {string} message - ההודעה שתוצג על המסך
 */
function blockPage(message) {
    // יצירת אלמנט div חדש
    const overlay = document.createElement('div');
    
    // עיצוב האלמנט כך שיכסה את כל המסך וימנע אינטראקציה
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#ffffff'; // רקע לבן ואטום
    overlay.style.color = '#000000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.fontSize = '32px';
    overlay.style.fontFamily = 'Arial, sans-serif';
    overlay.style.fontWeight = 'bold';
    overlay.style.zIndex = '2147483647'; // z-index מקסימלי כדי שיהיה מעל הכל
    overlay.style.direction = 'rtl';
    overlay.style.textAlign = 'center';
    overlay.style.padding = '20px';
    overlay.style.boxSizing = 'border-box';
    
    // הוספת הטקסט
    overlay.innerText = message;
    
    // ביטול אפשרות גלילה באתר עצמו
    document.body.style.overflow = 'hidden';
    
    // הוספת שכבת הכיסוי לדף
    document.body.appendChild(overlay);
}

// הפעלת הפונקציה בעת טעינת הסקריפט
checkShabbatStatus();
