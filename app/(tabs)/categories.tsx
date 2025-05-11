import {View, Text, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {router, useRouter} from "expo-router";
import {useGetCategoriesQuery} from "@/services/categoryService";
import LoadingOverlay from "@/components/LoadingOverlay";
import CategoryCard from "@/components/category/CategoryCard";


const CategoriesScreen = () => {


    const {data: categories, isLoading, error} = useGetCategoriesQuery();

    console.log("data", categories);
    console.log("error", error);

    return (
        <View>
            <Text style={styles.title}>Категорії</Text>
            <LoadingOverlay visible={isLoading} />
            <TouchableOpacity
                style={{
                    backgroundColor: "#4f46e5",
                    padding: 12,
                    borderRadius: 8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                }}
                onPress={() => router.replace("/create-category")}
            >
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>+ Додати категорію</Text>
            </TouchableOpacity>

            {categories && (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10, paddingBottom: 200 }}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View className="w-[49%] pb-5">
                            <CategoryCard category={item} />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    title: {fontSize: 20, marginBottom: 15, marginTop: 50, textAlign: "center", fontWeight: "bold"},

});

export default CategoriesScreen;