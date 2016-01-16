using System;
using Windows.UI.Xaml.Controls;
using Windows.Devices.Gpio;
using Windows.Devices.Pwm;
using Windows.UI.Xaml;
using IoT.Demo.Gpio.ViewModels;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace IoT.Demo.Gpio
{
	/// <summary>
	/// An empty page that can be used on its own or navigated to within a Frame.
	/// </summary>
	public sealed partial class MainPage : Page
	{
		public MainPage()
		{
			DataContext = new MainViewModel();
			this.InitializeComponent();
		}
	}
}
