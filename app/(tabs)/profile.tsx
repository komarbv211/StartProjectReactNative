import { View, Text, StyleSheet, TouchableOpacity, Image  } from "react-native";
import {useRouter} from "expo-router";
import { logOut} from "@/store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "@/store";
import AppLogo from "@/components/AppLogo";
import {removeFromSecureStore} from "@/utils/secureStore";
import {BASE_URL} from "@/constants/Urls";


const ProfileScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const user = useAppSelector((state) => state.user.user);

    const handleLogout = async () => {
        await removeFromSecureStore("authToken");

        dispatch(logOut());
        router.replace("/login");
    };

    return (
        <View style={styles.container}>
            <AppLogo />

            <Text style={styles.title}>Інформація про користувача:</Text>
            {user ? (
                <>
                    <Text>Email: {user.email}</Text>
                    <Text>Ім’я: {user.firstName}</Text>
                    <Text>Прізвище: {user.lastName}</Text>
                    <Text>Роль: {user.roles}</Text>
                    {user.image && (
                        <Image
                            source={{uri: `${BASE_URL}/images/100_${user.image}`}}
                            style={styles.userImage}
                        />
                    )}

                    <TouchableOpacity
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    >
                        <Text style={styles.logoutText}>Вийти</Text>
                    </TouchableOpacity>
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
    logoutButton: {
        marginTop: 30,
        padding: 12,
        backgroundColor: "#ff4d4d",
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: { color: "white", fontWeight: "bold" },
    userImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 20,
        alignSelf: "center",
    },
});


export default ProfileScreen;