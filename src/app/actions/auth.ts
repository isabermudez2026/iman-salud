"use server";

export async function verifyPassword(inputPassword: string): Promise<boolean> {
  // Leemos la variable directamente del entorno del servidor
  const correctPassword = process.env.PASSWORD_KEY || "";

  // Retornamos true si coinciden
  return inputPassword === correctPassword;
}
