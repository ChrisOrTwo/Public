using System;
using System.Windows.Input;

namespace Live.IoT.Demo.Gpio.Utils
{
	public class CommandHandler : ICommand
	{
		public event EventHandler CanExecuteChanged;

		private readonly Action _action;
		private readonly Func<bool> _canExecute = () => true;

		public CommandHandler(Action action, Func<bool> canExecute = null)
		{
			this._action = action;
			if (canExecute != null)
				_canExecute = canExecute;
		}

		public bool CanExecute(object parameter)
		{
			return _canExecute();
		}

		public void Execute(object parameter)
		{
			this._action();
		}
	}

	public class CommandHandler<T> : ICommand
	{
		public event EventHandler CanExecuteChanged;

		private readonly Action<T> _action;
		private readonly Func<T, bool> _canExecute;

		public CommandHandler(Action<T> action, Func<T, bool> canExecute = null)
		{
			_action = action;
			_canExecute = canExecute;
		}

		public bool CanExecute(object parameter)
		{
			return _canExecute == null || _canExecute((T)parameter);
		}

		public void Execute(object parameter)
		{
			this._action((T)parameter);
		}
	}
}