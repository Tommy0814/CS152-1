public class test {
	public static final int x = 42;

	public static void main(String[] args) {
		test.bar();
	}
	
	public static void foo() {
		System.out.println(x);
	}
	
	public static void bar() {
		int x = 666;
		foo();
	}
}