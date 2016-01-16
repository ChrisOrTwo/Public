using System;
using Windows.UI.Core;


namespace Iot.Demo.Gpio.Pwm.Utils
{
	public abstract class ViewModelBase : NotifyPropertyChanged
	{
		private readonly CoreDispatcher _dispatcher;

		protected ViewModelBase()
		{
			_dispatcher = CoreWindow.GetForCurrentThread().Dispatcher;
		}

		protected async void RunInUi(Action action)
		{
			await _dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => { action(); });
		}

	}
}