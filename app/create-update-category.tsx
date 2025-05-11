import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from "expo-router";
import {
    useCreateCategoryMutation,
    useEditCategoryMutation
} from "@/services/categoryService";
import {BASE_URL} from "@/constants/Urls";


const CategoryFormScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", description: "" });
    const [image, setImage] = useState<string | null>(null);
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useEditCategoryMutation();
    const params = useLocalSearchParams();

    useEffect(() => {
        if (params.id) {
            setForm((prev) => ({
                ...prev,
                name: params.name as string || "",
                description: params.description as string || "",
            }));

            if (params.image) {
                setImage(`${BASE_URL}/uploading/200_${params.image}`);
            }
        }
    }, []);

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Потрібен доступ до галереї!");
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

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("Name", form.name);
        formData.append("Description", form.description);

        if (image && !image.includes("/uploading/")) {
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
            if (params.id) {
                formData.append("Id", params.id as string);
                await updateCategory(formData).unwrap();
                Alert.alert("Оновлено", "Категорія оновлена");
            } else {
                await createCategory(formData).unwrap();
                Alert.alert("Створено", "Категорія створена");
            }

            setForm({ name: "", description: "" });
            setImage(null);
            router.replace("/categories");
        } catch (error) {
            console.error("Помилка:", error);
            Alert.alert("Помилка", "Не вдалося зберегти категорію");
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>
                {params.id ? "Редагування категорії" : "Створення категорії"}
            </Text>

            <TextInput
                placeholder="Назва категорії"
                value={form.name}
                onChangeText={(text) => handleChange("name", text)}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20, borderRadius: 6 }}
            />

            <TextInput
                placeholder="Опис категорії"
                value={form.description}
                onChangeText={(text) => handleChange("description", text)}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20, borderRadius: 6 }}
            />

            <TouchableOpacity
                style={{ backgroundColor: "#4f46e5", padding: 12, borderRadius: 6 }}
                onPress={pickImage}
            >
                <Text style={{ color: "#fff", textAlign: "center" }}>Обрати фото</Text>
            </TouchableOpacity>

            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 8, marginTop: 15, alignSelf: "center" }}
                />
            )}

            <TouchableOpacity
                style={{ backgroundColor: params.id ? "#f59e0b" : "#22c55e", padding: 14, borderRadius: 6, marginTop: 20 }}
                onPress={handleSubmit}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                    {params.id ? "Оновити" : "Створити"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CategoryFormScreen;
