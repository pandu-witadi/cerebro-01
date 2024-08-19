export type KeySettingConfiguration = 'Custom' | 'Chat';
export const SETTING_DB_KEY = 'WV_SETTING';

export interface SettingsPayload {
    selectedTheme: string;
    themes: SettingsConfiguration;
}

interface MetaInformation {
    title: string;
    description: string;
}

export interface SettingsConfiguration {
    Custom: CustomizationSettings;
    Chat: ChatSettings;
}

// Setting Options
export interface CustomizationSettings extends MetaInformation {
    settings: {
        title: TextFieldSetting;
        subtitle: TextFieldSetting;
        intro_message: TextFieldSetting;
        placeholder_message: TextFieldSetting;
        image: ImageFieldSetting;
        theme: SelectSetting;
    };
}

export interface ChatSettings extends MetaInformation {
    settings: {
        model: SelectSetting;
        caching: CheckboxSetting;
        suggestion: CheckboxSetting;
        info_button: CheckboxSetting;
        max_document_size: NumberFieldSetting;
    };
}

// Setting Fields
export interface TextFieldSetting {
    type: "text";
    text: string;
    description: string;
}

export interface NumberFieldSetting {
    type: "number";
    value: number;
    description: string;
}

export interface ImageFieldSetting {
    type: "image";
    src: string;
    description: string;
}

export interface CheckboxSetting {
    type: "check";
    checked: boolean;
    description: string;
}

export interface SelectSetting {
    type: "select";
    options: string[];
    value: string;
    description: string;
}

const BaseCustomization: CustomizationSettings = {
    title: "Customization",
    description: "Customize the layout by changing the title, subtitle, logo, and colors of the app.",
    settings: {
        title: {text: "Cerebro", type: "text", description: "Title of the Page"},
        subtitle: {
            text: "",
            type: "text",
            description: "Subtitle of the Page",
        },
        intro_message: {
            text: "Welcome to Cerebro !",
            type: "text",
            description: "Intro Message",
        },
        placeholder_message: {
            text: "Ask Cerebro anything!",
            type: "text",
            description: "Input Placeholder",
        },
        theme: {
            value: "light",
            type: "select",
            options: ['light', 'dark'],
            description: "Select theme",
        },
        image: {
            src: "https://github.com/weaviate/Verba/blob/main/img/verba_icon.png?raw=true",
            type: "image",
            description: "Logo of the Page",
        },
    },
};

const BaseChat: ChatSettings = {
    title: "Chat Settings",
    description: "Customize chat settings like caching generated answers and give the autocomplete suggestions.",
    settings: {
        model: {
            value: "llama3",
            type: "select",
            options: ['llama3', 'llava:7b'],
            description: "Select model",
        },
        caching: {checked: true, type: "check", description: "Enable Caching"},
        suggestion: {
            checked: true,
            type: "check",
            description: "Enable Autocompletion",
        },
        info_button: {
            checked: true,
            type: "check",
            description: "Enable Help Information",
        },
        max_document_size: {
            value: 10000,
            type: "number",
            description: "Max characters to show Documents",
        },
    },
};

export const BaseSettings: SettingsConfiguration = {
    Custom: BaseCustomization,
    Chat: BaseChat,
};
