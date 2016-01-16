using System;
using Windows.UI;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Media;
using Windows.Devices.Gpio;

namespace Live.IoT.Demo.Gpio.Utils
{
	public class GpioPinValueToBrushConverter : IValueConverter
	{
		public object Convert(object value, Type targetType, object parameter, string language)
		{
			var color = Colors.Black;
			var pinValue = (GpioPinValue)value;

			if (pinValue == GpioPinValue.High)
				color = Colors.Red;
			if (pinValue == GpioPinValue.Low)
				color = Colors.Green;

			return new SolidColorBrush(color);
		}

		public object ConvertBack(object value, Type targetType, object parameter, string language)
		{
			throw new NotImplementedException();
		}
	}
}