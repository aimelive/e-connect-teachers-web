export class Keys {
  //Firebase keys - project setup
  public static readonly API_KEY = import.meta.env.VITE_API_KEY || "";
  public static readonly AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN || "";
  public static readonly PROJECT_ID = import.meta.env.VITE_PROJECT_ID || "";
  public static readonly STORAGE_BUCKET =
    import.meta.env.VITE_STORAGE_BUCKET || "";
  public static readonly MESSAGING_SENDER_ID =
    import.meta.env.VITE_MESSAGING_SENDER_ID || "";
  public static readonly APP_ID = import.meta.env.VITE_APP_ID || "";
  public static readonly MEASUREMENT_ID =
    import.meta.env.VITE_MEASUREMENT_ID || "";

    
  //Constants
  public static readonly DEFAULT_ERROR_MESSAGE =
    "Something went wrong, please try again.";
}
