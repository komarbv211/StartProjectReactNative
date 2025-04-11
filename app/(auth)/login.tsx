import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
}
from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {useState} from "react";
import FormField from "@/components/FormField";
import {useRouter} from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {

    const router = useRouter(); // Ініціалізуємо роутер
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSignIp = async () => {
        console.log("Вхід:", form);
        try {
            const resp = await axios.post("https://pv212api.itstep.click/api/account/login", form);
            const { data } = resp;
            console.log("data", data);

            // Зберігаємо токен у AsyncStorage
            await AsyncStorage.setItem("token", data.token);

            setForm({ email: "", password: "" });

            // Перенаправляємо до профілю, передаючи токен
            router.replace("/profile");
        } catch (error) {
            console.error("Error login server", error);
        }
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            className="w-full flex justify-center items-center my-6"
                            style={{
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            <Text className={"text-3xl font-bold mb-6 text-black"}>
                                Вхід
                            </Text>

                            <FormField
                                title={"Пошта"}
                                value={form.email}
                                handleChangeText={(value: string) => handleChange("email", value)}
                                placeholder={"Вкажіть пошту"}
                                keyboardType="email-address"
                            />

                            <FormField
                                title={"Пароль"}
                                value={form.password}
                                handleChangeText={(value: string) => handleChange("password", value)}
                                placeholder={"Вкажіть пароль"}
                                secureTextEntry={true}
                            />
                            {/* Кнопка "Реєстрація" */}
                            <TouchableOpacity
                                onPress={handleSignIp}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Вхід
                                </Text>
                            </TouchableOpacity>

                            {/* Кнопка "Реєстрація" */}
                            <TouchableOpacity
                                onPress={() => router.replace("/register")}
                                className="w-full bg-gray-300 p-4 rounded-lg mt-2"
                            >
                                <Text className="text-black text-center text-lg font-medium">
                                    У Вас немає акаунту? Реєстрація
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default LoginScreen;