# 🎓 রাজনৈতিক তত্ত্ব - রাষ্ট্রবিজ্ঞান ১ম পত্র (Political Theory)
### জাতীয় বিশ্ববিদ্যালয় বিএ / বিএসএস ডিগ্রি (পাস) ১ম বর্ষ চূড়ান্ত পরীক্ষা সহায়িকা ও অ্যান্ড্রয়েড অ্যাপ
### National University Bangladesh · Degree 1st Year Exam Master · Paper Code: 111901

---

## 📱 প্রজেক্ট পরিচিতি (Project Overview)

এই প্রজেক্টটি জাতীয় বিশ্ববিদ্যালয় বাংলাদেশের ডিগ্রি ১ম বর্ষের শিক্ষার্থীদের জন্য **রাষ্ট্রবিজ্ঞান ১ম পত্র (রাজনৈতিক তত্ত্ব - বিষয় কোড: ১১১৯০১)**-এর একটি পূর্ণাঙ্গ ও প্রামাণ্য শিক্ষামূলক অ্যাপ্লিকেশন। এটি একই সাথে একটি আধুনিক **ওয়েব প্ল্যাটফর্ম (React + Tailwind CSS)** এবং একটি সম্পূর্ণ **নেটিভ অ্যান্ড্রয়েড অ্যাপ (Kotlin + Jetpack Compose + Material 3)** হিসেবে ডিজাইন করা হয়েছে।

### 🌟 প্রধান বৈশিষ্ট্যসমূহ (Key Features):
1. **ক-বিভাগ (অতি সংক্ষিপ্ত প্রশ্নাবলি):** ১২টি থেকে ১০টির উত্তর, প্রতিটি ১ নম্বর। শতভাগ প্রামাণ্য ও নির্ভুল উত্তরমালা।
2. **খ-বিভাগ (সংক্ষিপ্ত প্রশ্নাবলি):** ৮টি থেকে ৫টির উত্তর, প্রতিটি ৪ নম্বর। ভূমিকা, পয়েন্ট ও উপসংহারভিত্তিক কাঠামোগত উত্তর।
3. **গ-বিভাগ (রচনামূলক প্রশ্নাবলি):** ৮টি থেকে ৫টির উত্তর, প্রতিটি ১০ নম্বর। বিস্তারিত তাত্ত্বিক আলোচনা, তুলনামূলক বিশ্লেষণ ও মূল্যায়ন।
4. **🧠 MCQ ও স্ব-মূল্যায়ন কুইজ:** শিক্ষার্থীদের প্রস্তুতি যাচাইয়ের জন্য ইন্টার‍্যাক্টিভ নৈর্ব্যক্তিক প্রশ্নব্যাংক ও তাৎক্ষণিক স্কোর।
5. **⭐ ৯৯% কমন সাজেশনস:** বিগত ১০ বছরের বোর্ড পরীক্ষার প্রশ্ন বিশ্লেষণ করে সর্বোচ্চ প্রাধান্যপ্রাপ্ত তারকা চিহ্নিত প্রশ্নাবলী।
6. **📜 দার্শনিকদের অনুপ্রেরণামূলক উক্তি (Motivational Quotes):** প্লেটো, অ্যারিস্টটল, ম্যাকিয়াভেলি, রুশো, লক প্রমুখ রাষ্ট্রচিন্তাবিদের বিখ্যাত দর্শন ও উক্তি।
7. **📊 স্টাডি পরিসংখ্যান (Study Progress Tracker):** প্রতিটি সেকশনে পড়ার অগ্রগতি ট্র্যাকিং ও শতকরা হিসাব।
8. **🎧 অডিও স্টাডি প্লেয়ার:** হ্যান্ডস-ফ্রি রিভিশনের জন্য অডিও স্টাডি মোড।

---

## 🏗 অ্যান্ড্রয়েড আর্কিটেকচার (Android Architecture)

- **Language:** Kotlin 1.9.24
- **UI Toolkit:** Jetpack Compose (Material 3)
- **Compile SDK / Target SDK:** 34 (Android 14)
- **Minimum SDK:** 24 (Android 7.0 Nougat+)
- **Build System:** Gradle 8.7 + Android Gradle Plugin 8.4.2
- **Java Compatibility:** JDK 17 (LTS)
- **Architecture Pattern:** Clean Compose Single-Activity (`MainActivity.kt`) with Reactive StateFlow/Compose State.

---

## ⚙️ লোকাল বিল্ড নির্দেশিকা (Local Build Instructions)

### প্রাক-প্রয়োজনীয়তা (Prerequisites):
- **JDK 17** (OpenJDK 17 বা Eclipse Temurin 17)
- **Android Studio** (Hedgehog / Iguana / Jellyfish বা তার পরবর্তী সংস্করণ) অথবা Android SDK Command-line Tools

### লোকালি বিল্ড করার কমান্ড (Terminal Commands):
```bash
# ১. রিপোজিটরি ক্লোন করুন
git clone <your-repository-url>
cd <repository-folder>

# ২. Gradle Wrapper এক্সিকিউটেবল করুন (Linux/macOS)
chmod +x ./gradlew

# ৩. রিয়েল অ্যান্ড্রয়েড ডিবাগ এপিকে (Debug APK) তৈরি করুন
./gradlew assembleDebug

# ৪. বিল্ড সম্পন্ন হলে আসল এপিকে (APK) ফাইলটি পাবেন এখানে:
app/build/outputs/apk/debug/app-debug.apk
```

---

## 🚀 অটোমেটেড গিটহাব অ্যাকশনস ও এপিকে বিল্ড (Automated GitHub Actions CI/CD)

এই প্রজেক্টে রয়েছে একটি সম্পূর্ণ স্বয়ংক্রিয় এবং বাস্তব **GitHub Actions Workflow** (`.github/workflows/android-build.yml`)।

### ওয়ার্কফ্লো যেভাবে কাজ করে:
1. কোড `main` বা `master` ব্রাঞ্চে পুশ হলে স্বয়ংক্রিয়ভাবে Ubuntu রানারে বিল্ড প্রক্রিয়া শুরু হয়।
2. **JDK 17** ও **Android SDK** কনফিগার করে `./gradlew assembleDebug` কমান্ডের মাধ্যমে আসল এপিকে বিল্ড করা হয়।
3. বিল্ড শেষে `app/build/outputs/apk/debug/app-debug.apk` ফাইলের সাইজ এবং জিপ ইন্টিগ্রিটি যাচাই করা হয়।
4. রিয়েল এপিকে ফাইলটি নিচের দুটি ডিরেক্টরিতে কপি করা হয়:
   - `.build-outputs/app-debug.apk`
   - `APK_DOWNLOAD/app-debug.apk`
5. উভয় ফাইলের `SHA256` হ্যাশ মিলিয়ে অভিন্নতা নিশ্চিত করা হয়।
6. এপিকে ফাইলটিকে গিটহাব অ্যাকশনস আর্টিফ্যাক্ট (`app-debug-apk`) হিসেবে আপলোড করা হয়।
7. স্বয়ংক্রিয় বট (`github-actions[bot]`) এর মাধ্যমে `APK_DOWNLOAD/app-debug.apk` সরাসরি রিপোজিটরিতে কমিট ও পুশ করা হয়।

### 📥 সরাসরি এপিকে ডাউনলোড (Direct APK Download):
বিল্ড শেষ হলে গিটহাব কোড ব্রাউজার থেকে সরাসরি ডাউনলোড করা যাবে:
```
GitHub Repository
   └── APK_DOWNLOAD/
          └── app-debug.apk   <--- [সরাসরি ডাউনলোড লিঙ্ক]
```

---

## 🔒 নিরাপত্তা ও কনফিগারেশন (Security & Secrets)

- কোনো সংবেদনশীল এপিআই কি (API Keys) সোর্স কোডে রাখা হয়নি।
- রিলিজ সাইনিংয়ের জন্য প্রয়োজনীয় Keystore তথ্য GitHub Secrets এর মাধ্যমে প্রদানযোগ্য (`KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, ইত্যাদি)।

---

## 🛠 ট্রাবলশুটিং (Troubleshooting)

| সমস্যা | সমাধান |
|---|---|
| `JAVA_HOME is not set` | নিশ্চিত করুন আপনার সিস্টেমে JDK 17 ইনস্টল করা আছে এবং `export JAVA_HOME=/path/to/jdk-17` সেট করা আছে। |
| `Permission denied: ./gradlew` | রান করুন: `chmod +x ./gradlew` |
| `SDK location not found` | রুট ডিরেক্টরিতে `local.properties` ফাইলে `sdk.dir=/path/to/Android/sdk` উল্লেখ করুন। |

---

*জাতীয় বিশ্ববিদ্যালয় ডিগ্রি ১ম বর্ষের সকল পরীক্ষার্থীদের প্রস্তুতি সহজ ও সফল করার প্রত্যয়ে নিবেদিত।*
