using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Windows.UI.Core;
using IoT.Demo.Gpio.Annotations;

namespace IoT.Demo.Gpio.Utils
{
	public abstract class NotifyPropertyChanged : INotifyPropertyChanged
	{
		public event PropertyChangedEventHandler PropertyChanged;

		[NotifyPropertyChangedInvocator]
		protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}
	}

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