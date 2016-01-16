using System;
using Windows.Devices.Gpio;
using Windows.UI;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Media;

namespace IoT.Demo.Gpio
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