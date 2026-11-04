# HCG Mobile (mobileMaps)

> Proyecto histórico en **React Native 0.68 / React 17** para mapas, geolocalización y notificaciones push. Este README te deja el proyecto listo para correr hoy sin volverte arqueólogo de commits. 🧭⚙️

## 🚀 Características principales

- **Mapas** con `react-native-maps` (marcadores, polígonos y cálculo de áreas).
- **Geolocalización** con `@react-native-community/geolocation` y permisos con `react-native-permissions`.
- **Navegación** con `@react-navigation` (Stack + Bottom Tabs).
- **Notificaciones Push** con **Firebase Cloud Messaging** (`@react-native-firebase/messaging`).
- **Autenticación** básica con contexto (`src/context/AuthContext.tsx`) y almacenamiento local con `@react-native-async-storage/async-storage`.
- **API** vía `axios` con interceptores y token desde AsyncStorage.
- **Socket.IO client** para eventos en tiempo real.
- UI con `react-native-vector-icons`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-screens` y `safe-area-context`.

## 🧱 Stack y versiones relevantes

- **React Native:** 0.68.1
- **React:** 17.0.2
- **TypeScript:** 4.x
- **Android:** Gradle/AGP acorde a RN 0.68
- **iOS:** CocoaPods (Ruby/Bundler)
- Firebase: incluye `android/app/google-services.json` (Android); **iOS requiere agregar `GoogleService-Info.plist`**.

> Para RN 0.68 se recomienda Node.js 16.x (o 18 con cuidado), JDK 11, Android Studio actualizado y Xcode 13+ (macOS).

## 📂 Estructura (resumen)

```
mobileMaps/
├─ App.tsx
├─ index.js
├─ app.json
├─ package.json
├─ ios/
├─ android/
└─ src/
   ├─ api/
   │  ├─ mobileApi.tsx        # Base URL (revisar y actualizar)
   │  └─ cafeApi.tsx          # Base URL (revisar y actualizar)
   ├─ components/
   │  └─ Maps.tsx             # Mapa, markers, polygons
   ├─ context/
   │  └─ AuthContext.tsx      # Auth + token en AsyncStorage
   ├─ navigation/
   │  ├─ StartRouter.tsx
   │  ├─ BottomTabs.tsx
   │  ├─ StackAnalysis.tsx
   │  ├─ StackRecords.tsx
   │  └─ StackSchedule.tsx
   ├─ screens/
   │  ├─ Start.tsx            # Login/registro
   │  ├─ TabHome.tsx          # Home con mapa
   │  ├─ TabReports.tsx
   │  └─ TabUser.tsx
   ├─ styleSheet/
   │  └─ StyleSheet.ts
   └─ utils/
      └─ pushnotification_helper.ts
```

## 🔧 Requisitos previos

- **Node.js 16.x** (recomendado para RN 0.68)
- **Yarn** o **npm**
- **Java JDK 11**, Android Studio + SDK/NDK + emulador o dispositivo físico
- **Xcode** + **CocoaPods** (`sudo gem install cocoapods`) en macOS si vas a compilar iOS
- **Ruby/Bundler** para manejar Pods (ver `Gemfile`)

## ⚙️ Configuración necesaria (¡importante!)

### 1) URLs de API

Edita estos archivos y pon tus endpoints:

- `src/api/mobileApi.tsx` → variable `baseURL`

> Sugerencia: migra estos valores a variables de entorno (por ejemplo, usando `react-native-config`) si vas a mantener el proyecto.

### 2) Google Maps API Key

**Android:** ya existe una clave demo en `android/app/src/main/AndroidManifest.xml` con el meta `com.google.android.geo.API_KEY`. **Cámbiala por tu propia API key** de Google Maps Platform.

- Habilita **Maps SDK for Android** en Google Cloud Console y restringe la clave por app/sha1 y por API.

**iOS:** agrega la key de Google Maps (si usas `PROVIDER_GOOGLE`):

- En `ios/<AppName>/AppDelegate.mm` importa y provee la key, por ejemplo:
  ```objc
  #import <GoogleMaps/GoogleMaps.h>
  [GMSServices provideAPIKey:@"TU_API_KEY"];
  ```
- Habilita **Maps SDK for iOS** y restringe la clave por bundle id.

### 3) Firebase Cloud Messaging (Push)

- **Android:** ya hay `android/app/google-services.json`. Verifica que pertenezca a tu proyecto Firebase.
- **iOS:** **agrega** `GoogleService-Info.plist` a `ios/<AppName>/` y vincúlalo en Xcode.
- Revisa `src/utils/pushnotification_helper.ts` para el registro de permisos, token FCM y listeners.

### 4) Permisos (Location & Notifications)

- **Android:** `AndroidManifest.xml` ya declara `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`, `ACCESS_BACKGROUND_LOCATION` y `POST_NOTIFICATIONS` (Android 13+). Asegúrate de manejar los flujos de permisos en runtime (`react-native-permissions`).
- **iOS:** agrega en `Info.plist`:
  - `NSLocationWhenInUseUsageDescription`
  - `NSLocationAlwaysAndWhenInUseUsageDescription`
  - `UIBackgroundModes` → `location` (si realmente usas background)
  - Notificaciones: `FirebaseMessagingAutoInitEnabled` y capacidades de push + APNs.

### 5) React Native Reanimated

- Debe existir el plugin en `babel.config.js` (al final de `plugins`: `'react-native-reanimated/plugin'`).
- Limpia cachés si ves errores extraños:
  ```bash
  yarn start --reset-cache
  ```

## 🛠️ Instalación

```bash
# 1) Instalar dependencias JS
yarn            # o npm install

# 2) iOS: instalar Pods (macOS)
cd ios && bundle install && bundle exec pod install && cd ..
# (Si no usas Bundler: cd ios && pod install && cd ..)

# 3) Parchear dependencias si aplica
npx patch-package
```

## ▶️ Ejecución

```bash
# Metro bundler
npm run start

# Android (emulador abierto o dispositivo conectado)
npm run android

# iOS (simulador)
npm run ios
```

## 🧪 Scripts disponibles

- `npm run start` – Levanta Metro bundler.
- `npm run android` – Compila y despliega Android.
- `npm run ios` – Compila y despliega iOS (macOS).
- `npm run test` – Pruebas con Jest.

## 🩺 Solución de problemas comunes

- **`TypeError: Cannot read property '...` con Reanimated** → agrega el plugin en `babel.config.js` y borra cachés (`yarn start --reset-cache`).
- **`Could not find GoogleService-Info.plist` en iOS** → asegúrate de arrastrarlo a Xcode y marcar “Copy items if needed”.
- **Mapas no muestran tiles / clave inválida** → revisa restricciones de la **API key** y que el SDK correcto esté habilitado.
- **Permisos de ubicación en Android 12/13+** → usa `react-native-permissions` y maneja los 3 niveles: `Fine`, `Approximate`, `Background`.
- **Notificaciones en Android 13+** → requiere `POST_NOTIFICATIONS`. En iOS, activa APNs y certificados en tu proyecto.
- **`vector-icons`** no cargan → para RN 0.68 el autolink suele ser suficiente; si no, limpia build (`cd android && ./gradlew clean`).
- **Fallos de Pods** → borra `ios/Pods`, `ios/Podfile.lock` y corre `pod install` de nuevo.

## 🔒 Notas de seguridad

- No subas **API keys** ni **google-services.json**/**GoogleService-Info.plist** a repos públicos.
- Cambia las URLs hardcodeadas en `src/api/*.ts` por variables de entorno.
- Revisa que el `interceptor` no loguee tokens en producción.

## 🗺️ Roadmap / TODO (sugerido)

- Migrar a **React Native 0.7x+** y **React 18**.
- Sustituir URLs por `.env` con `react-native-config`.
- Añadir **EAS Build** o CI/CD.
- Auditar permisos de background y consumo de batería.
- Tests de integración para navegación/mapas.

---

**Créditos & contexto:** Proyecto original `Julio Mariscal`

> _“Código viejo, proyecto nuevo: si compila, ¡se celebra!”_ 🎉
