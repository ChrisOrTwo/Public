using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using IoT.Demo.Gpio.Pwm.Annotations;


namespace Iot.Demo.Gpio.Pwm.Utils
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
}