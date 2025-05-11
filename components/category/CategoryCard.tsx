import React from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { BASE_URL } from '@/constants/Urls';
import { ICategoryItem } from "@/interfaces/category";
import { router } from 'expo-router';
import { useDeleteCategoryMutation } from '@/services/categoryService';
import { FontAwesome } from '@expo/vector-icons';

interface CategoryCardProps {
    category: ICategoryItem;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleEdit = () => {
        router.push({
            pathname: "/create-update-category",
            params: {
                id: category.id.toString(),
                name: category.name,
                description: category.description,
                image: category.image
            }
        });
    };

    const confirmDelete = () => {
        Alert.alert(
            "Підтвердження",
            `Ви впевнені, що хочете видалити категорію "${category.name}"?`,
            [
                { text: "Скасувати", style: "cancel" },
                {
                    text: "Видалити",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteCategory(category.id).unwrap();
                        } catch (err) {
                            console.error("Помилка при видаленні:", err);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View className="flex flex-1 bg-white rounded-md p-2 items-center shadow-sm shadow-white relative">
            <Image
                source={{ uri: `${BASE_URL}/uploading/200_${category.image}` }}
                className="w-24 h-24 rounded-full mb-2"
            />
            <Text className="text-lg font-semibold mb-1 text-center">{category.name}</Text>

            <View className="flex-row mt-2 gap-6">
                <TouchableOpacity onPress={handleEdit}>
                    <FontAwesome name="edit" size={20} color="#2563eb" />

                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDelete}>
                    <FontAwesome name="trash" size={20} color="#dc2626" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const areEqual = (prevProps: CategoryCardProps, nextProps: CategoryCardProps) => {
    return (
        prevProps.category.id === nextProps.category.id &&
        prevProps.category.name === nextProps.category.name &&
        prevProps.category.image === nextProps.category.image
    );
};

export default React.memo(CategoryCard, areEqual);
