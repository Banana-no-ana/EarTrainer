function checkHandler(chk)
{
	if (chk.checked)
	{
		$(chk).next().removeClass("checkbox");
		$(chk).next().addClass("checkboxChecked");
	}
	else
	{
		$(chk).next().removeClass("checkboxChecked");
		$(chk).next().addClass("checkbox");
	}
}