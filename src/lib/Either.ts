export class Either<Left, Right> {
	private right!: Right;
	private error!: Left;

	public Error(): Left | undefined {
		return this.error ?? undefined;
	}

	/**
	 *
	 * @returns true si tiene errores el either false si el either no cuenta con errores
	 */
	public errors(): boolean {
		return this.error ? true : false;
	}

	/**
	 * @param error Error a agregar
	 * agrega un tipo de error al either
	 */
	public setError(error: Left): void {
		this.error = error;
	}

	/**
	 *Este método agrega una respuesta correcta siempre que no se tengan registrados errores
	 * @param data Datos correctos de la tarea
	 */
	public setRight(data: Right): void {
		if (this.errors()) {
			return;
		}

		this.right = data;
	}

	public isRight(): boolean {
		return this.right !== undefined;
	}

	public isLeft(): boolean {
		return this.error !== undefined;
	}

	public Right(): Right {
		return this.right;
	}
}
