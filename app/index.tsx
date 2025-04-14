import {useAppDispatch} from "@/store";
import {useEffect} from "react";
import {getValueForSecureStore} from "@/utils/secureStore";
import {setCredentials} from "@/store/slices/userSlice";
import {jwtParse} from "@/utils/jwtParse";
import {IUser} from "@/interfaces/account";
import {router} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
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
import FormField from "@/components/FormField";
import ScrollView = Animated.ScrollView;

const Welcome = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        getValueForSecureStore('authToken')
            .then((res) => {
                if (res) {
                    dispatch(setCredentials({ user: jwtParse(res) as IUser, token: res }))
                    router.replace('/profile')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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
                                Вітаємо у нашому додатку.
                            </Text>

                            {/* Кнопка "Переходио на вхід" */}
                            <TouchableOpacity
                                onPress={() => router.replace("/login")}
                                className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Вхід
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}

export default Welcome