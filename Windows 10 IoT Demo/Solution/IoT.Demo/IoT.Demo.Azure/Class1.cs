using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Devices.Client;

namespace IoT.Demo.Azure
{
	public sealed class IotHubClient
	{
		private readonly string _connectionString =
			"HostName=Iot-Demo-Hub.azure-devices.net;DeviceId=rasbiak;SharedAccessKey=3fC31almf5uxMeq6C8N0OX/gVWGWxi6ed8vrDPuphXU=";

		private readonly string _deviceId = "rasbiak";

		private DeviceClient _deviceClient;
		
		public async Task Connect()
		{
			_deviceClient = DeviceClient.CreateFromConnectionString(_connectionString,TransportType.Http1);
			//var text = "Hellow, Windows 10!";
			//var msg = new Message(Encoding.UTF8.GetBytes(text));

			await _deviceClient.OpenAsync();
			await _deviceClient.CloseAsync();
		}

		public async Task Disconnet()
		{
			await _deviceClient.CloseAsync();
		}

		public async Task SendMessage(string message)
		{
			var eventMessage = new Message(Encoding.UTF8.GetBytes(message));
			await _deviceClient.SendEventAsync(eventMessage);
		}

		public async Task ReceiveMessage()
		{
			var receivedMessage = await _deviceClient.ReceiveAsync(TimeSpan.FromSeconds(5));
			await _deviceClient.CompleteAsync(receivedMessage);
			var received = Encoding.ASCII.GetString(receivedMessage.GetBytes());
		}
	}
}