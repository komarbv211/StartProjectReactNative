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

const RegisterScreen = () => {
    const router = useRouter(); // Ініціалізуємо роутер для навігації між сторінками

    // Стан для збереження введених користувачем даних
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    // Функція для оновлення стану полів форми
    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    // Функція для обробки натискання кнопки реєстрації
    const handleSignUp = () => {
        if (form.password !== form.confirmPassword) {
            console.log("Помилка: Паролі не співпадають");
            return;
        }
        console.log("Реєстрація:", form);
        // Тут можна додати логіку реєстрації, наприклад, відправку даних на сервер
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
                                minHeight: Dimensions.get("window").height - 100, // Мінімальна висота екрану
                            }}
                        >
                            <Text className={"text-3xl font-bold mb-6 text-black"}>
                                Реєстрація
                            </Text>

                            {/* Поле введення імені */}
                            <FormField
                                title={"Ім'я"}
                                value={form.name}
                                handleChangeText={(value: string) => handleChange("name", value)}
                                placeholder={"Вкажіть ім'я"}
                            />

                            {/* Поле введення електронної пошти */}
                            <FormField
                                title={"Пошта"}
                                value={form.email}
                                handleChangeText={(value: string) => handleChange("email", value)}
                                placeholder={"Вкажіть пошту"}
                                keyboardType="email-address"
                            />

                            {/* Поле введення пароля */}
                            <FormField
                                title={"Пароль"}
                                value={form.password}
                                handleChangeText={(value: string) => handleChange("password", value)}
                                placeholder={"Вкажіть пароль"}
                                secureTextEntry={true} // Приховуємо введений пароль
                            />

                            {/* Поле підтвердження пароля */}
                            <FormField
                                title={"Підтвердьте пароль"}
                                value={form.confirmPassword}
                                handleChangeText={(value: string) => handleChange("confirmPassword", value)}
                                placeholder={"Повторіть пароль"}
                                secureTextEntry={true} // Приховуємо введений пароль
                            />

                            {/* Кнопка реєстрації */}
                            <TouchableOpacity
                                onPress={handleSignUp}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Зареєструватися
                                </Text>
                            </TouchableOpacity>

                            {/* Кнопка переходу на сторінку входу */}
                            <TouchableOpacity
                                onPress={() => router.replace("/login")}
                                className="w-full bg-gray-300 p-4 rounded-lg mt-2"
                            >
                                <Text className="text-black text-center text-lg font-medium">
                                    Вже маєте акаунт? Увійдіть
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default RegisterScreen;
