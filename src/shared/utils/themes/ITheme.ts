export default interface ITheme {
  palett: {
    title: 'light' | 'dark';
    fonts: {
      regular: string;
      medium: string;
      bold: string;
    };
    colors: {
      primary: string;

      secondary: string;
      secondary_light: string;

      success: string;
      sucess_light: string;

      attention: string;
      attention_light: string;

      shape: string;
      title: string;
      text: string;
      background: string;
    };
  };
}
