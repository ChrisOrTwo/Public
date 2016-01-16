using System;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace IoT.Demo.Buses
{
	/// <summary>
	/// An empty page that can be used on its own or navigated to within a Frame.
	/// </summary>
	public sealed partial class MainPage : Page
	{
		private MainViewModel _vm;

		public MainPage()
		{
			this.InitializeComponent();
			_vm = new MainViewModel();
			_vm.RunUart();
		}

		private void OnRunSpi(object sender, RoutedEventArgs e)
		{
			_vm.RunSpi();
		}

		private void OnRunI2C(object sender, RoutedEventArgs e)
		{
			_vm.RunI2C();
		}

		private void OnRunUart(object sender, RoutedEventArgs e)
		{
			_vm.RunUart();
		}
	}
}
