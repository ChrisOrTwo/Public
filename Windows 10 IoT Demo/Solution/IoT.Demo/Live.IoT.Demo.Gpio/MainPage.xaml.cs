using Windows.UI.Xaml.Controls;
using Live.IoT.Demo.Gpio.ViewModels;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace Live.IoT.Demo.Gpio
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
