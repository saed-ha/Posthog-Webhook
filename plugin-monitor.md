# دليل مراقبة PostHog Webhook Filter Plugin

## أين تجد الـ logs:

### 1. **في PostHog Interface:**
- اذهب إلى **Settings → Plugins**
- ابحث عن **Webhook Filter Plugin**
- اضغط على الـ plugin
- ابحث عن **Logs** أو **Activity** tab

### 2. **في System Logs:**
- اذهب إلى **Settings → System**
- ابحث عن **Logs** أو **Activity Logs**
- ابحث عن رسائل تبدأ بـ `[WebhookFilter]`

### 3. **في Server Logs (إذا كان PostHog محلي):**
```bash
# إذا كنت تشغل PostHog محلياً
docker logs posthog-web
# أو
docker logs posthog-server
```

## ما ستجده في الـ logs:

### رسائل الـ Plugin:
```
[WebhookFilter] 2024-01-01T12:00:00.000Z [INFO] Event received: pageview
[WebhookFilter] 2024-01-01T12:00:00.001Z [INFO] Event pageview matches conditions, sending to webhook
[WebhookFilter] 2024-01-01T12:00:00.002Z [INFO] Sending webhook to https://your-api.com/webhook
[WebhookFilter] 2024-01-01T12:00:00.003Z [INFO] Webhook sent successfully to https://your-api.com/webhook. Status: 200
[WebhookFilter] 2024-01-01T12:00:00.004Z [INFO] Successfully sent event pageview to webhook
```

### رسائل الأخطاء:
```
[WebhookFilter] 2024-01-01T12:00:00.000Z [ERROR] Failed to send webhook to https://your-api.com/webhook: Network error
[WebhookFilter] 2024-01-01T12:00:00.001Z [WARNING] Webhook URL not configured, skipping event processing
```

## كيفية اختبار الـ Plugin:

### 1. **إنشاء حدث اختبار:**
- اذهب إلى **Events** في PostHog
- اضغط **Record event**
- أنشئ حدث باسم `test_webhook`
- اضغط **Record**

### 2. **مراقبة الـ logs:**
- انتظر بضع ثوان
- ابحث في الـ logs عن رسائل `[WebhookFilter]`
- يجب أن ترى رسالة مثل:
```
[WebhookFilter] Event received: test_webhook
```

### 3. **اختبار الشروط:**
- إذا كان لديك شروط محددة، ستجد رسائل مثل:
```
[WebhookFilter] Event test_webhook does not match conditions, skipping
```

## حل المشاكل:

### إذا لم ترى أي logs:
1. **تأكد من تفعيل الـ plugin**
2. **تحقق من إعدادات الـ plugin**
3. **أعد تشغيل PostHog إذا كان محلياً**

### إذا لم يتم إرسال webhook:
1. **تحقق من صحة الـ webhook URL**
2. **تأكد من أن الـ webhook يستقبل POST requests**
3. **تحقق من الـ headers المطلوبة**

### إذا كانت الشروط لا تعمل:
1. **تحقق من صيغة JSON للشروط**
2. **تأكد من أسماء الخصائص**
3. **اختبر الشروط واحدة تلو الأخرى**

## نصائح للمراقبة:

1. **استخدم DigitalOcean Function** (الذي أنشأناه) كـ webhook للاختبار
2. **راقب الـ logs بانتظام** للتأكد من عمل الـ plugin
3. **اختبر الشروط** على أحداث بسيطة أولاً
4. **احتفظ بنسخة من الـ logs** للمراجعة لاحقاً

## مثال لـ webhook URL للاختبار:
```
https://your-digitalocean-function.ondigitalocean.app/webhook
```

هذا سيساعدك في مراقبة عمل الـ plugin بسهولة! 🔍 