using System;
using System.Threading;
using System.Threading.Tasks;
using Windows.UI.Core;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace IoT.Demo.Headed.Xaml
{
	/// <summary>
	/// An empty page that can be used on its own or navigated to within a Frame.
	/// </summary>
	public sealed partial class MainPage : Page
	{
		public MainPage()
		{
			this.InitializeComponent();
			Task.Run(() => { TimerTask(); });
		}

		private int _timerCounter = 0;

		private async void TimerTask()
		{
			while (true)
			{
				await Task.Delay(TimeSpan.FromSeconds(1));
				_timerCounter++;
				await Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => this.TimerTextPlaceholder.Text = _timerCounter.ToString());
			}
		}

		private void ButtonBase_OnClick(object sender, RoutedEventArgs e)
		{
			this.TextPlaceholder.Text = "Hello Hardgroup!";
		}
	}
}
