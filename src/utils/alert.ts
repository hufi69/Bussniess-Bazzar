import { showMessage, MessageType } from "react-native-flash-message";
import { TOP_COLORS } from "../config/theme";

export const showAlert = (message: string, type: MessageType = "danger", description?: string) => {
    showMessage({
        message,
        description,
        type,
        backgroundColor: type === "danger" ? TOP_COLORS.accent : type === "success" ? TOP_COLORS.success : TOP_COLORS.primary,
        color: TOP_COLORS.white,
        duration: 3000,
        floating: true,
        titleStyle: { fontWeight: '700' },
    });
};
