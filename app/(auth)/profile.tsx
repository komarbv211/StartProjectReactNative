import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Імпортуємо AsyncStorage
import {jwtDecode} from "jwt-decode"; // Імпортуємо jwtDecode

// Оголошуємо інтерфейс для типізації користувача
interface UserInfo {
    email: string;
    name: string;
    roles: string;
}

const ProfileScreen = () => {
    // Типізуємо userInfo як UserInfo або null, якщо ще не отримано дані
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    const decoded = jwtDecode<UserInfo>(token); // Розшифровуємо токен і типізуємо
                    setUserInfo(decoded); // Оновлюємо стан з інформацією про користувача
                }
            } catch (error) {
                console.error("Не вдалося отримати токен", error);
            }
        };
        getToken();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Інформація про користувача:</Text>
            {userInfo ? (
                <>
                    <Text>Email: {userInfo.email}</Text>
                    <Text>Ім’я: {userInfo.name}</Text>
                    <Text>Роль: {userInfo.roles}</Text>
                </>
            ) : (
                <Text>Завантаження даних...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 20, marginBottom: 15, fontWeight: "bold" },
});

export default ProfileScreen;
