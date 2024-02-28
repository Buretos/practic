export const getLastPageFromLinks = (links) => {
	console.log('links:', links);
	const result = links.match(/^.+_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"$/);
	// с помощью регулярного выражения ищем число (в скобочной группе от 1 до 9999)

	return result ? Number(result[1]) : 1; // первым элементом (нулевым) массива будет вся строка, а второым (первым) искомая скобочная группа.
}; // если первая страница и последняя, то не выводит result поэтому ставим условие и присваиваем последней странице номер один.
