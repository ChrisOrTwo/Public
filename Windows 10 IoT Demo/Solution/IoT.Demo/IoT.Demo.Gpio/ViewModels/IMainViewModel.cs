using System.Collections.ObjectModel;
using System.Windows.Input;

namespace IoT.Demo.Gpio.ViewModels
{
	public interface IMainViewModel
	{
		ObservableCollection<IPinViewModel> PinMappings { get; set; }

		ICommand ToggleOutputCommand { get; }

		ICommand ReadAllPinsCommand { get; }
	}
}