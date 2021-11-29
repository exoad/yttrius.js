#include<memory_resource>
#include<iostream>
#include<unistd.h>
using namespace std;
#pragma GCC diagnostic ignored "-Wunused-parameter"

signed main() {
  std::pmr::monotonic_buffer_resource mbr{};
  std::pmr::polymorphic_allocator<char> alloc{&mbr};
  std::string s{alloc};
  s.reserve(1024);
  s.resize(1024);
  std::cout << "s.capacity() = " << s.capacity() << std::endl;
  std::cout << "s.size() = " << s.size() << std::endl;
  std::cout << "s.max_size() = " << s.max_size() << std::endl;
  std::cout << "s.data() = " << s.data() << std::endl;
  std::cout << "s.empty() = " << s.empty() << std::endl;
  std::cout << "s.max_size() = " << s.max_size() << std::endl;

  while(true) {
    sleep(1);
  }

}