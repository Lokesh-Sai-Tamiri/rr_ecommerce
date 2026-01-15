// third party
import { Open_Sans } from "next/font/google"; // Change from Roboto to Poppins

// types
import { ConfigProps } from "types/config";

export const DASHBOARD_PATH = "/sample-page";
export const HORIZONTAL_MAX_ITEM = 7;

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export enum MenuOrientation {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export enum ThemeDirection {
  LTR = "ltr",
  RTL = "rtl",
}

export enum AuthProvider {
  JWT = "jwt",
  FIREBASE = "firebase",
  AUTH0 = "auth0",
  AWS = "aws",
  SUPABASE = "supabase",
}

export enum DropzopType {
  default = "DEFAULT",
  standard = "STANDARD",
}

export const APP_AUTH: AuthProvider = AuthProvider.JWT;

// S3 Configuration
export const S3_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  region: process.env.AWS_REGION || "us-east-1",
  bucketName: process.env.S3_BUCKET_NAME || "your-bucket-name",
};

// MySQL Configuration
export const MYSQL_CONFIG = {
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "radiant_research",
};

const config: ConfigProps = {
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  fontFamily: openSans.style.fontFamily, // Use Poppins font
  borderRadius: 8,
  outlinedFilled: true,
  mode: ThemeMode.LIGHT,
  presetColor: "default",
  i18n: "en",
  themeDirection: ThemeDirection.LTR,
  container: true,
};

export default config;
