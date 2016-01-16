using System;
using System.Diagnostics;
using System.Linq;
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;
using Windows.Devices.SerialCommunication;
using Windows.Devices.Spi;
using Windows.Storage.Streams;

namespace IoT.Demo.Buses
{
	public class MainViewModel
	{
		public void RunUart()
		{
			new UartBus().Run();
		}

		public void RunSpi()
		{
			new SpiBus().Run();
		}

		public void RunI2C()
		{
			new I2Cbus().Run();
		}
	}

	public class SpiBus
	{
		public async void Run()
		{
			var controller = await SpiController.GetDefaultAsync();

			var settings = new SpiConnectionSettings(1);
			using (var device = controller.GetDevice(settings))
			{
				byte[] buffer = { 0x01, 0x02, 0x03 };
				device.Write(buffer);
			}
		}
	}

	public class I2Cbus
	{
		public async void Run()
		{
			var controller = await I2cController.GetDefaultAsync();

			var slaveAddress = 0x40;
			var settings = new I2cConnectionSettings(slaveAddress);
			using (var device = controller.GetDevice(settings))
			{
				byte[] input = { 0x01, 0x02, 0x03 };
				byte[] output = {};
				var result = device.WritePartial(input);
				Debug.WriteLine(result.Status + " " + result.BytesTransferred);
			}
		}
	}

	public class UartBus
	{
		public async void Run()
		{
			var aqs = SerialDevice.GetDeviceSelector("UART0");
			var info = await DeviceInformation.FindAllAsync(aqs);
			var serial = await SerialDevice.FromIdAsync(info[0].Id);

			serial.WriteTimeout = TimeSpan.FromMilliseconds(1000);
			serial.ReadTimeout = TimeSpan.FromMilliseconds(1000);
			serial.BaudRate = 9600;
			serial.Parity = SerialParity.None;
			serial.StopBits = SerialStopBitCount.One;
			serial.DataBits = 8;

			var writter = new DataWriter();
			writter.WriteString("Hello RPI2");
			var writtenBittes = await serial.OutputStream.WriteAsync(writter.DetachBuffer());

			var reader = new DataReader(serial.InputStream);
			var readBittes = await reader.LoadAsync(1024);
			var output = reader.ReadString(readBittes);
		}
	}
}