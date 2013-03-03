function Vector2(x, y)
{
	this.x = x;
	this.y = y;
	
	if (y == null)
		this.y = x;
}

Vector2.add = function(v1, v2)
{
	return { x:v1.x + v2.x, y:v1.y + v2.y };
}

Vector2.subtract = function(v1, v2)
{
	return { x:v1.x - v2.x, y:v1.y - v2.y };
}

Vector2.transform = function(vec, matrix)
{
	var result;
	
	result.x = matrix.m11 * vec.x
	         + matrix.m12 * vec.y
			 + matrix.x * 1;
			 
	result.y = matrix.m21 * vec.x
			 + matrix.m22 * vec.y
			 + matrix.y * 1;
	 
	return result;
}

function Matrix2x3(m11, m12, m21, m22, x, y)
{
	this.m11 = m11;
	this.m12 = m12;
	this.m21 = m21;
	this.m22 = m22;
	this.x = x;
	this.y = y;
}

Matrix2x3.prototype.invert = function()
{
	var result;
	
	result.m11 = this.m22;
	result.m12 = -this.m12;
	result.m21 = -this.m21;
	result.m22 = this.m11
	result.x = -this.x;
	result.y = -this.y;
	
	return result;
}

function Rect(position, size)
{
	this.position = position;
	this.size = size;
}

function Size(width, height)
{
	this.width = width;
	this.height = height;
}