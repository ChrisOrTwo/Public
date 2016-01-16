using System.Collections.ObjectModel;
using System.Linq;
using System.Windows.Input;
using IoT.Demo.Gpio.Utils;

namespace IoT.Demo.Gpio.ViewModels
{
	public class MainViewModel : NotifyPropertyChanged, IMainViewModel
	{
		private readonly int[] _gpioPinIds = {4, 17, 27, 22, 5, 6, 13, 19, 26, 18, 23, 24, 25, 12, 16, 20, 21};

		private ObservableCollection<IPinViewModel> _pinMappings;

		public MainViewModel()
		{
			PinMappings = new ObservableCollection<IPinViewModel>(_gpioPinIds.Select(x => new PinViewModel(x)).ToList());
			ToggleOutputCommand = new CommandHandler<int>(TogglePin);
			ReadAllPinsCommand = new CommandHandler(ReadAllPins);
		}

		public ObservableCollection<IPinViewModel> PinMappings
		{
			get { return _pinMappings; }
			set
			{
				_pinMappings = value;
				OnPropertyChanged();
			}
		}

		public ICommand ToggleOutputCommand { get; }
		public ICommand ReadAllPinsCommand { get; }

		public void ReadAllPins()
		{
			foreach (var pinViewModel in PinMappings)
			{
				pinViewModel.Read();
			}
		}

		public void TogglePin(int id)
		{
			PinMappings.FirstOrDefault(x => x.Id == id)?.Toggle();
		}
	}
}