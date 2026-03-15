צור עמודים לכל פריטי הסיידבר — סה"כ 9 עמודים עם תוכן אמיתי. הסיידבר נשאר קבוע בכל העמודים עם אותו סגנון.

## העמודים:

### 1. Overview (/overview)
דשבורד ראשי עם:
- 4 KPI cards בשורה אחת למעלה: Total Assets (221), Critical Findings (18), Open Risks (47), Monitored Entities (12). כל card עם אייקון, מספר גדול, וchangepercentage קטן בירוק או אדום (כמו +12% או -5%)
- Line chart — "Risk Findings Over Time" שמציג trend של 6 חודשים אחרונים, ציר X = חודשים, ציר Y = מספר findings, עם שני קווים: Critical (אדום) ו-High (כתום)
- Pie/Donut chart — "Assets by Type" שמציג חלוקה: Storage 52%, Server 18%, Endpoint 20%, Application 10%
- טבלה קטנה — "Recent Risk Findings" עם 5 שורות אחרונות, עמודות: Severity badge (Critical/High), Finding Name, Affected Asset, Time Ago (כמו "2 hours ago")

### 2. Risk Findings (/risk-findings)
טבלה עם אותו layout כמו Assets. עמודות:
- Checkbox
- Severity — badge צבעוני: Critical (רקע אדום כהה #D62828, טקסט לבן), High (רקע כתום #F77F00, טקסט לבן), Medium (רקע צהוב #FEF3C7, טקסט #92400E), Low (רקע אפור #ECF0F5, טקסט #474E62)
- Finding Name — כמו "Unencrypted S3 Bucket", "Exposed API Gateway", "Outdated TLS Configuration"
- Affected Asset — שם asset כחול (link)
- Category — כמו "Encryption", "Access Control", "Network", "Configuration"
- Status — badge: Open (כחול), Resolved (ירוק), Ignored (אפור)
- First Seen — תאריך
- Last Seen — תאריך
- Actions ⋮

Filters בheader: Severity dropdown, Status dropdown, Category dropdown, Search. כפתורי Export ו-"+ New Finding"
Counter: "47 open findings"
15 שורות עם מגוון של severity levels ו-statuses. Pagination.

### 3. Business Entities Risks (/business-entities-risks)
טבלה שמקבצת סיכונים לפי business entity. עמודות:
- Entity Name — כמו "Payment Processing", "User Authentication", "Data Analytics", "Cloud Infrastructure", "API Gateway Services"
- Total Risks — מספר
- Critical — מספר באדום
- High — מספר בכתום
- Medium — מספר בצהוב
- Low — מספר באפור
- Risk Score — progress bar מ-0 עד 100 (אדום מעל 80, כתום 50-80, ירוק מתחת ל-50)
- Last Assessment — תאריך
- Actions ⋮

Counter: "12 business entities"
כפתורי Export. 12 שורות. Pagination.

### 4. Assets Risks (/assets-risks)
טבלה דומה אבל מקובצת לפי asset. עמודות:
- Asset Name — כמו MS-WKS-14
- Type — עם icon badge (Server, Endpoint, Application, Storage) כמו בעמוד Assets
- Business Criticality — מספר באדום
- Total Findings — מספר
- Critical — מספר באדום
- High — מספר בכתום
- Medium — מספר בצהוב
- Last Scan Date — תאריך
- Actions ⋮

Filters: Type dropdown, Criticality dropdown, Search
Counter: "221 assets scanned"
15 שורות. Pagination.

### 5. Business Entities (/business-entities)
טבלת ניהול ישויות עסקיות. עמודות:
- Checkbox
- Entity Name — כמו "Payment Processing", "User Authentication", "Cloud Infrastructure", "Customer Data", "Internal Tools"
- Description — טקסט תיאור קצר
- Associated Assets — מספר כחול (link, כמו Business Entities בעמוד Assets)
- Owner — שם משתמש עם avatar קטן
- Created — תאריך
- Updated — תאריך
- Actions ⋮

Counter: "12 business entities"
כפתורי Export ו-"+ New Entity" (כפתור primary כחול)
12 שורות. Pagination.

### 6. Assets (/assets)
כבר קיים — זה העמוד הנוכחי. לא צריך לשנות אותו.

### 7. Context Events (/context-events)
לוג אירועים כרונולוגי. עמודות:
- Timestamp — תאריך ושעה מלאים (כמו "03/05/26 15:44")
- Event Type — badge צבעוני: "Asset Created" (כחול), "Risk Detected" (אדום), "Entity Updated" (ירוק), "User Action" (אפור), "Scan Completed" (סגול)
- Source Asset — שם asset (link כחול)
- Description — כמו "New storage asset CO-WKS-22 was added", "Critical vulnerability detected on MS-WKS-14"
- Severity — badge: Critical, High, Medium, Low, Info
- User — שם משתמש עם avatar

Filters: Date Range picker, Event Type dropdown, Severity dropdown, Search
Counter: "1,247 events"
15 שורות, הכי חדש למעלה. Pagination.

### 8. Manage Users (/manage-users)
טבלת ניהול משתמשים. עמודות:
- Checkbox
- Name — שם מלא עם avatar קטן (כמו "Sarah Cohen", "Michael Levy", "Tamar Friedman", "David Katz")
- Email — כתובת מייל
- Role — badge: Admin (סגול), Editor (כחול), Viewer (אפור)
- Last Login — תאריך ושעה, או "Never" באפור
- Status — badge: Active (ירוק), Invited (צהוב), Disabled (אפור)
- Actions ⋮

Counter: "8 users"
כפתורי Export ו-"+ Invite User" (primary כחול)
8 שורות. Pagination.

### 9. Notifications (/notifications)
עמוד עם 3 tabs למעלה: All, Unread (עם counter badge אדום), Critical

רשימת התראות (לא טבלה, אלא list items):
כל notification הוא card/row עם:
- Unread indicator — נקודה כחולה בצד שמאל אם unread
- Icon לפי type: 🔴 Critical finding, ⚠️ Warning, ✅ Resolved, ℹ️ Info
- Title — כמו "Critical vulnerability detected on MS-WKS-14"
- Description — שורה אחת של פירוט
- Time — "2 hours ago", "Yesterday", "3 days ago"
- Action link — "View Finding" או "View Asset" בכחול

Counter: "5 unread notifications"
20 notifications עם מגוון סוגים. כפתור "Mark all as read" (ghost) בheader.

## Routing ומבנה סיידבר:

הסיידבר צריך להישאר קבוע בכל העמודים עם אותו סגנון בדיוק. העמוד הפעיל מסומן עם left border כחול (#1B7EFF) + רקע כחול שקוף. מבנה routing:

```
Risk Insights (section label)
  /overview
  /risk-findings
  /business-entities-risks
  /assets-risks

Data Management (section label)
  /business-entities
  /assets
  /context-events

User Management (section label)
  /manage-users

/notifications (בתחתית הסיידבר)
```

כל עמוד שומר על אותו layout pattern: סיידבר שמאלי 200px כהה + header עם כותרת העמוד, counter, filter dropdowns, search, וכפתורי פעולה + אזור תוכן ראשי לבן.