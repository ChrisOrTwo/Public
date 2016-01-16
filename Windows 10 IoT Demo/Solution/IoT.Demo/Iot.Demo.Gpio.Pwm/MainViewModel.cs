using System;
using System.Linq;
using System.Windows.Input;
using Windows.Devices.Gpio;
using Windows.Devices.Pwm;
using Iot.Demo.Gpio.Pwm.Utils;

namespace Iot.Demo.Gpio.Pwm
{
	public interface IMainViewModel
	{
		double MinFreq { get; }
		double MaxFreq { get; }
		double Freq { get; }
		double DutyCycle { get; set; }
		ICommand TogglePwm { get; }
		bool IsPwmRunning { get; }
	}

	public class MainViewModel : ViewModelBase, IMainViewModel
	{
		#region Implementation

		private double _dutyCycle;
		private double _minFreq;
		private double _maxFreq;

		public MainViewModel()
		{
			TogglePwm = new CommandHandler(OnTogglePwm);
			InitPwm();
			UpdateData();
		}

		public double Freq
		{
			get { return _freq; }
			private set
			{
				_freq = value;
				OnPropertyChanged();
			}
		}

		public double DutyCycle
		{
			get { return _dutyCycle; }
			set
			{
				_dutyCycle = value;
				OnPropertyChanged();
				UpdateDutyCycle(value);
			}
		}

		public ICommand TogglePwm { get; }

		public bool IsPwmRunning
		{
			get { return _pin != null && _pin.IsStarted; }
		}

		public double MaxFreq
		{
			get { return _maxFreq; }
			private set
			{
				_maxFreq = value;
				OnPropertyChanged();
			}
		}

		public double MinFreq
		{
			get { return _minFreq; }
			private set
			{
				_minFreq = value;
				OnPropertyChanged();
			}
		}

		public void UpdateData()
		{
			MinFreq = _controller.MinFrequency;
			MaxFreq = _controller.MaxFrequency;
			Freq = _controller.ActualFrequency;
			DutyCycle = 100 * _pin.GetActiveDutyCyclePercentage();
			OnPropertyChanged("IsPwmRunning");
		}

		private void OnTogglePwm()
		{
			if (IsPwmRunning)
				StopPwm(_pin);
			else
				StartPwm(_pin);
			UpdateData();
		}

		#endregion

		private void UpdateDutyCycle(double value)
		{
			var effectiveValue = value / 100;
			_pin.SetActiveDutyCyclePercentage(effectiveValue);
		}

		private PwmPin _pin;
		private PwmController _controller;
		private double _freq;

		private async void InitPwm()
		{
			//_controller = (await PwmController.GetControllersAsync(PwmPCA9685.PwmProviderSoftware.GetPwmProvider())).First();
			_controller = (await PwmController.GetControllersAsync(PwmSoftware.PwmProviderSoftware.GetPwmProvider())).First();
			_controller.SetDesiredFrequency(40);
			_pin = _controller.OpenPin(5);
			_pin.SetActiveDutyCyclePercentage(0.5);
		}

		private void StartPwm(PwmPin pin)
		{
			pin.Start();
		}

		private void StopPwm(PwmPin pin)
		{
			pin.Stop();
		}

	}


}