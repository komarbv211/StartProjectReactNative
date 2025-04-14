import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {useState} from "react";
import FormField from "@/components/FormField";
import {useRouter} from "expo-router";
import {useLoginMutation} from "@/services/accountService";
import {useAppDispatch} from "@/store";
import { setCredentials} from "@/store/slices/userSlice";
import {saveToSecureStore} from "@/utils/secureStore";
import {jwtParse} from "@/utils/jwtParse";
import {IUser} from "@/interfaces/account";

const LoginScreen = () => {

    const router = useRouter(); // Ініціалізуємо роутер
    const [form, setForm] = useState({ email: "", password: "" });

    const [login, { isLoading }] = useLoginMutation()

    const dispatch = useAppDispatch(); // Використовуємо dispatch з Redux

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };
    const handleSignIp = async () => {
        console.log("Вхід:", form);
        try {
            const res = await login({ ...form }).unwrap()
           console.log("data", res)

            await saveToSecureStore('authToken', res.token)
            dispatch(setCredentials({ user: jwtParse(res.token) as IUser, token: res.token }))

            setForm({ email: "", password: "" });

            // Перенаправляємо користувача на сторінку профілю
            router.replace("/(auth)/profile");
        }
        catch (error) {
            console.error("Error login server", error);
        }
        // Тут можна додати логіку реєстрації
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
                                onPress={() => router.replace("/explore")}
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