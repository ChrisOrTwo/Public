using System;
using Windows.Devices.Gpio;
using IoT.Demo.Gpio.Utils;

namespace IoT.Demo.Gpio.ViewModels
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
			var controller = GpioController.GetDefault();
			return controller.OpenPin(pinId, GpioSharingMode.Exclusive);
		}

		public void ClosePin(GpioPin pin)
		{
			pin.Dispose();
		}

		public void ReadPinValue(GpioPin pin)
		{
			Value = pin.Read();
			Mode = pin.GetDriveMode();
		}

		public void WatchPinValue(GpioPin pin)
		{
			pin.DebounceTimeout = TimeSpan.FromMilliseconds(300);
			pin.ValueChanged += (sender, args) => { RunInUi(() => ReadPinValue(sender)); };
		}

		public void TogglePinValue(GpioPin pin)
		{
			var value = pin.Read();
			pin.Write(value == GpioPinValue.High ? GpioPinValue.Low : GpioPinValue.High);
			pin.SetDriveMode(GpioPinDriveMode.Output);
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