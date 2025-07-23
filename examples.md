# أمثلة عملية لاستخدام Webhook Filter Plugin

## مثال 1: إرسال جميع أحداث pageview إلى webhook

**الهدف**: إرسال جميع أحداث تصفح الصفحات إلى نظام خارجي

**الإعدادات**:
```json
{
  "webhook_url": "https://your-analytics-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"equals\", \"value\": \"pageview\"}]"
}
```

**النتيجة**: سيتم إرسال جميع أحداث `pageview` إلى الـ webhook المحدد.

---

## مثال 2: إرسال أحداث من مستخدمين محددين

**الهدف**: إرسال أحداث فقط من مستخدمين يبدأ ID الخاص بهم بـ "premium_"

**الإعدادات**:
```json
{
  "webhook_url": "https://your-crm.com/webhook",
  "conditions": "[{\"property\": \"distinct_id\", \"operator\": \"starts_with\", \"value\": \"premium_\"}]"
}
```

**النتيجة**: سيتم إرسال أحداث المستخدمين المميزين فقط.

---

## مثال 3: إرسال أحداث الشراء بقيمة عالية

**الهدف**: إرسال أحداث الشراء التي تزيد قيمتها عن 100 دولار

**الإعدادات**:
```json
{
  "webhook_url": "https://your-finance-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"equals\", \"value\": \"purchase\"}, {\"property\": \"$value\", \"operator\": \"greater_than\", \"value\": 100}]"
}
```

**النتيجة**: سيتم إرسال أحداث الشراء عالية القيمة فقط.

---

## مثال 4: إرسال أحداث من موقع محدد

**الهدف**: إرسال جميع الأحداث من صفحات تحتوي على "checkout" في الرابط

**الإعدادات**:
```json
{
  "webhook_url": "https://your-ecommerce-api.com/webhook",
  "conditions": "[{\"property\": \"$current_url\", \"operator\": \"contains\", \"value\": \"checkout\"}]"
}
```

**النتيجة**: سيتم إرسال جميع الأحداث من صفحات الدفع.

---

## مثال 5: إرسال أحداث مع بيانات مخصصة

**الهدف**: إرسال أحداث مع خاصية مخصصة "user_type" بقيمة "vip"

**الإعدادات**:
```json
{
  "webhook_url": "https://your-vip-api.com/webhook",
  "conditions": "[{\"property\": \"user_type\", \"operator\": \"equals\", \"value\": \"vip\"}]"
}
```

**النتيجة**: سيتم إرسال أحداث المستخدمين VIP فقط.

---

## مثال 6: إرسال أحداث مع headers مخصصة

**الهدف**: إرسال أحداث مع token مصادقة

**الإعدادات**:
```json
{
  "webhook_url": "https://your-secure-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"equals\", \"value\": \"signup\"}]",
  "custom_headers": "{\"Authorization\": \"Bearer your-secret-token\", \"X-API-Version\": \"v2\"}"
}
```

**النتيجة**: سيتم إرسال أحداث التسجيل مع headers المصادقة.

---

## مثال 7: إرسال جميع الأحداث (بدون تصفية)

**الهدف**: إرسال جميع الأحداث إلى webhook للنسخ الاحتياطي

**الإعدادات**:
```json
{
  "webhook_url": "https://your-backup-api.com/webhook",
  "conditions": "[]"
}
```

**النتيجة**: سيتم إرسال جميع الأحداث بدون أي تصفية.

---

## مثال 8: إرسال أحداث مع استثناءات

**الهدف**: إرسال جميع الأحداث ما عدا أحداث "heartbeat"

**الإعدادات**:
```json
{
  "webhook_url": "https://your-analytics-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"not_equals\", \"value\": \"heartbeat\"}]"
}
```

**النتيجة**: سيتم إرسال جميع الأحداث ما عدا أحداث "heartbeat".

---

## مثال 9: إرسال أحداث من مستخدمين جدد

**الهدف**: إرسال أحداث من مستخدمين لم يسبق لهم الزيارة

**الإعدادات**:
```json
{
  "webhook_url": "https://your-onboarding-api.com/webhook",
  "conditions": "[{\"property\": \"$initial_referrer\", \"operator\": \"is_set\", \"value\": null}]"
}
```

**النتيجة**: سيتم إرسال أحداث المستخدمين الجدد فقط.

---

## مثال 10: إرسال أحداث مع بيانات كاملة

**الهدف**: إرسال أحداث مع جميع البيانات الكاملة للحدث

**الإعدادات**:
```json
{
  "webhook_url": "https://your-full-data-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"equals\", \"value\": \"purchase\"}]",
  "include_event_data": "true"
}
```

**النتيجة**: سيتم إرسال أحداث الشراء مع جميع البيانات الكاملة للحدث.

---

## نصائح مهمة

1. **اختبار الشروط**: تأكد من اختبار شروطك على بيانات حقيقية قبل النشر
2. **مراقبة الأداء**: استخدم شروط بسيطة لتجنب التأثير على أداء النظام
3. **الأمان**: استخدم HTTPS للـ webhook URLs وتجنب إرسال بيانات حساسة
4. **التوثيق**: وثق شروطك جيداً لفريقك
5. **النسخ الاحتياطي**: فكر في إعداد نسخة احتياطية من البيانات المهمة 