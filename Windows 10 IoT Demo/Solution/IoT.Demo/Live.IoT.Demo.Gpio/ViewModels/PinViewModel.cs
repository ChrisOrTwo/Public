using System;
using Windows.Devices.Gpio;
using Live.IoT.Demo.Gpio.Utils;

namespace Live.IoT.Demo.Gpio.ViewModels
{
	public class PinViewModel : ViewModelBase, IPinViewModel
	{
		private readonly GpioPin _pin;

		public PinViewModel(int id)
		{
			Id = id;

			_pin = OpenPin(id);
			ReadPinValue(_pin);
			WatchPinValue(_pin);
		}

		public GpioPin OpenPin(int pinId)
		{
			
		}

		public void ClosePin(GpioPin pin)
		{
			
		}

		public void ReadPinValue(GpioPin pin)
		{
			
		}

		public void WatchPinValue(GpioPin pin)
		{
			
		}

		public void TogglePinValue(GpioPin pin)
		{
			
		}

		#region Implementation

		public int Id { get; private set; }

		public void Read()
		{
			ReadPinValue(_pin);
		}

		public void Toggle()
		{
			TogglePinValue(_pin);
		}

		public GpioPinValue Value
		{
			get { return _value; }
			private set
			{
				_value = value;
				OnPropertyChanged();
			}
		}

		public GpioPinDriveMode Mode
		{
			get { return _mode; }
			private set
			{
				_mode = value;
				OnPropertyChanged();
			}
		}

		private GpioPinDriveMode _mode;
		private GpioPinValue _value;

		#endregion
	}
}