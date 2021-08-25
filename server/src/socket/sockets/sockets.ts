class Sockets {
	private sockets!: Record<string, string>;

	add({ userId, socketId }: { userId: string; socketId: string }) {
		this.sockets = { ...this.sockets, [userId]: socketId };
	}

	get(userId: string): string | null {
		return this.sockets[userId] || null;
	}

	remove(userId: string) {
		delete this.sockets[userId];
	}

	removeBySocketId(socketId: string) {
		this.sockets = Object.entries(this.sockets)
			.filter(([_k, value]) => value !== socketId)
			.reduce((previous, [k, v]) => ({ ...previous, [k]: v }), {});
	}
}

export const sockets = new Sockets();
