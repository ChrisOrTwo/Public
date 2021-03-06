using Windows.Devices.Gpio;

namespace IoT.Demo.Gpio.ViewModels
{
	public interface IPinViewModel
	{
		GpioPinDriveMode Mode { get; }
		GpioPinValue Value { get; }
		int Id { get; }
		void Read();
		void Toggle();
	}
}