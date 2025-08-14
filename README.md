# 🎬 Mobile Movie App

## 🤖 Introduction
Built with **Expo**, **TypeScript**, and **Tailwind CSS**, this mobile app fetches movies and uses a **custom popularity algorithm** powered by **Appwrite**. It offers a seamless movie browsing experience, ranking titles based on user engagement metrics. Designed with modern UI/UX principles, the app is responsive, visually appealing, and scalable for real-world performance.

---

## ⚙️ Tech Stack

### **Expo**
An open-source platform for building universal native apps (Android, iOS, web) using JavaScript/TypeScript and React Native.  
Key features: file-based routing via **Expo Router**, fast refresh, native modules (camera, maps, notifications), over-the-air updates (**EAS**), and streamlined app deployment.

### **React Native**
A framework for building mobile UIs with React. Enables **component-based, cross-platform development** with declarative UI, native API access, and tight Expo integration.

### **Appwrite**
An open-source backend-as-a-service platform providing:
- Secure authentication (email/password, OAuth, SMS, magic links)
- Databases, file storage (compression/encryption)
- Real-time messaging
- Serverless functions
- Static hosting with **Appwrite Sites**
All managed via a **unified console** and microservices architecture.

### **TypeScript**
A statically typed superset of JavaScript with type annotations, interfaces, enums, generics, and strong tooling. Improves error detection, maintainability, and scalability.

### **Tailwind CSS + NativeWind**
Tailwind CSS is a utility-first CSS framework for rapid UI development.  
NativeWind brings Tailwind-style utilities to React Native & Expo, enabling **fast, consistent, and responsive UI** design.

---

## 🔋 Features
- **Real-time data:** Fetch and display live movie data  
- **Home Page:** Featured and discovery sections  
- **Search Page:** Search for your favorite movies  
- **Popularity Algorithm:** Tracks user reactions to rank top movies  
- **Save Screen:** Shows all movies you’ve reacted to  
- Clean architecture & reusable components for maintainability

---

## 💡 Why I Built This
I wanted to create a mobile app that goes beyond just listing movies. Many movie apps show trending films based on external sources, but I wanted **personalized popularity**—ranking movies based on actual **user interaction inside the app**. This makes recommendations feel more relevant and community-driven.

---

## 🛠 Problems I Solved
- **Lack of personalized trending data:**  
  Instead of pulling only external "popular" lists, the app tracks in-app **reactions** and dynamically updates rankings.
- **Disconnected reaction data:**  
  I implemented a **Save Screen** to give users a central place to revisit all movies they’ve interacted with.
- **Seamless real-time updates:**  
  The integration with Appwrite ensures the popularity rankings and saved movies update instantly.

---

## 📚 What I Learned
- Building and integrating a **custom popularity algorithm** with a backend service (Appwrite)
- Implementing **real-time data synchronization** in a mobile app
- Designing **scalable UI architecture** with reusable components
- Styling mobile apps using **Tailwind CSS principles in NativeWind**
- Improving TypeScript skills for type safety and maintainability

---

## 📝 TODO (Future Improvements)
- [ ] **Login system** — allow users to create and manage accounts  
- [ ] **Improved UI** — enhance visual design and polish animations  
- [ ] **Profile screen** — display user info, stats, and movie reaction history  
