export class ExperienceBar {

	_grades = {
		0: { name: 'Nothing', min: 0, max: 60, nextGradeId: 1 },
		1: { name: 'Iron', min: 60, max: 150, nextGradeId: 2 },
		2: { name: 'Platinum', min: 150, max: 300, nextGradeId: 3 },
		3: { name: 'Diamond', min: 300, max: 500, nextGradeId: 4 },
		4: { name: 'Bedrock', min: 500, max: 100_000, nextGradeId: null }
	};

	/**
	 * Объект, содержащий узлы элементов страницы
	 * @typedef { Object } Nodes
	 * @property { HTMLElement | null } balanceNode
	 * @property { HTMLElement | null } balanceTotalNode
	 * @property { HTMLProgressElement | null } balanceProgressNode
	 * @property { HTMLElement | null } balanceGrade
	 */

	/**
	 * Объект, содержащий узлы элементов страницы
	 * @type { Nodes }
	 */
	_nodes = {
		balanceNode: null,
		balanceTotalNode: null,
		balanceProgressNode: null,
		balanceGrade: null
	}

	_cssSelectors = {
		balance: '.balance',
		balanceTotal: '.balance-total',
		balanceProgress: '.balance-progress',
		balanceGrade: '.balance-grade'
	};

	_balance = {
		_initBalance: 0,
		_addedBalance: 0,
		_totalBalance: 0
	};

	_currentGradeId = -1;

	constructor() {
		this._initNodes();
		this._calcCurrentGrade();
		// this._initEventListeners();
	}

	_initNodes() {
		this._nodes.balanceNode = document.querySelector(this._cssSelectors.balance);
		if (this._nodes.balanceNode === null) {
			throw new Error(`ExperienceBar: элемент с классом ${this._cssSelectors.balance} не найден`);
		}

		this._nodes.balanceTotalNode = this._nodes.balanceNode.querySelector(this._cssSelectors.balanceTotal);
		if (this._nodes.balanceTotalNode === null) {
			throw new Error(`ExperienceBar: элемент с классом ${this._cssSelectors.balanceTotal} не найден`);
		}

		this._nodes.balanceProgressNode = this._nodes.balanceNode.querySelector(this._cssSelectors.balanceProgress);
		if (this._nodes.balanceProgressNode === null) {
			throw new Error(`ExperienceBar: элемент с классом ${this._cssSelectors.balanceProgress} не найден`);
		}

		this._nodes.balanceGrade = this._nodes.balanceNode.querySelector(this._cssSelectors.balanceGrade);
		if (this._nodes.balanceGrade === null) {
			throw new Error(`ExperienceBar: элемент с классом ${this._cssSelectors.balanceGrade} не найден`);
		}
	}

	// _initEventListeners() {

	// }

	/**
	 * Функция для добавления нового баланса
	 * @param {number} newBalance - Новое значение баланса, положительное число
	 */
	addBalance(newBalance) {
		this._balance._addedBalance = newBalance;
		this._calcTotalBalance();
		this._calcCurrentGrade();
		this._renderBalance();
	}

	/**
	 * Функция для установки изначального баланса
	 * @param {number} initBalance - Значение изначального баланса
	 */
	setInitBalance(initBalance) {
		this._balance._initBalance = initBalance;
		this._calcTotalBalance();
		this._calcCurrentGrade();
		this._renderBalance();
	}

	_renderBalance() {
		const currentGrade = this.getCurrentGrade();
		const nextGrade = this._grades[this._currentGradeId + 1];
		const balance = this._balance._totalBalance;
		const max = currentGrade.max;
		const min = currentGrade.min;

		// console.log(currentGrade);
		// console.log(nextGrade);

		this._nodes.balanceProgressNode.setAttribute('min', 0);
		this._nodes.balanceProgressNode.setAttribute('max', max - min);
		this._nodes.balanceProgressNode.value = balance - min;
		this._nodes.balanceTotalNode.textContent = balance;
		this._nodes.balanceGrade.textContent = currentGrade.name;

		if (nextGrade !== undefined) {
			this._nodes.balanceGrade.textContent = nextGrade.name;
		}
		
	}

	_calcTotalBalance() {
		this._balance._totalBalance = this._balance._initBalance + this._balance._addedBalance;
	}

	_calcCurrentGrade() {
		const totalBalance = this._balance._totalBalance;

		for (const idGrade in this._grades) {
			const grade = this._grades[idGrade];
			const min = grade.min;
			const max = grade.max;

			if (totalBalance >= min && totalBalance < max) {
				this._currentGradeId = Number(idGrade);
				break;
			}

		}
	}

/**
 * @returns {{ name: string, min: number, max: number, nextGradeId: number }}
 */
	getCurrentGrade() {
		if (this._currentGradeId === -1) {
			throw new Error('ExperienceBar: текущий грейд не установлен');
		}

		return this._grades[this._currentGradeId];	
	}



}