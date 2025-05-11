import { useState } from "react";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import { useRouter } from "expo-router";
import FormField from "@/components/FormField";
import { useRegisterMutation } from "@/services/accountService";

const RegisterScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const [image, setImage] = useState<string | null>(null);
    const [register, { isLoading }] = useRegisterMutation();

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Потрібен доступ до галереї!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSignUp = async () => {
        if (form.password !== form.confirmPassword) {
            alert("Паролі не співпадають");
            return;
        }

        const formData = new FormData();
        formData.append("FirstName", form.firstName);
        formData.append("LastName", form.lastName);
        formData.append("Email", form.email);
        formData.append("Password", form.password)

        if (image) {
            const filename = image.split('/').pop()!;
            const match = /\.(\w+)$/.exec(filename);
            const ext = match?.[1];
            const mimeType = `image/${ext}`;

            formData.append("Image", {
                uri: image,
                name: filename,
                type: mimeType,
            } as any);
        }

        try {
            const res = await register(formData).unwrap();
            console.log("Користувача зареєстровано:", res);
            router.replace("/login");
        } catch (error) {
            console.error("Помилка реєстрації", error);
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
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            className="w-full flex justify-center items-center my-6"
                            style={{ minHeight: Dimensions.get("window").height - 100 }}
                        >
                            <Text className="text-3xl font-bold mb-6 text-black">Реєстрація</Text>
                            <FormField
                                title="Ім'я"
                                value={form.firstName}
                                handleChangeText={(value) => handleChange("firstName", value)}
                                placeholder="Вкажіть ім'я"
                            />
                            <FormField
                                title="Прізвище"
                                value={form.lastName}
                                handleChangeText={(value) => handleChange("lastName", value)}
                                placeholder="Вкажіть прізвище"
                            />
                            <FormField
                                title="Пошта"
                                value={form.email}
                                handleChangeText={(value) => handleChange("email", value)}
                                placeholder="Вкажіть пошту"
                                keyboardType="email-address"
                            />
                            <FormField
                                title="Пароль"
                                value={form.password}
                                handleChangeText={(value) => handleChange("password", value)}
                                placeholder="Вкажіть пароль"
                                secureTextEntry={true}
                            />
                            <FormField
                                title="Підтвердьте пароль"
                                value={form.confirmPassword}
                                handleChangeText={(value) => handleChange("confirmPassword", value)}
                                placeholder="Повторіть пароль"
                                secureTextEntry={true}
                            />

                            <TouchableOpacity
                                onPress={pickImage}
                                className="w-full bg-indigo-300 p-3 rounded-lg mt-4"
                            >
                                <Text className="text-center text-white font-bold">Обрати фото</Text>
                            </TouchableOpacity>

                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
                                />
                            )}

                            <TouchableOpacity
                                onPress={handleSignUp}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Зареєструватися
                                </Text>
                            </TouchableOpacity>

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