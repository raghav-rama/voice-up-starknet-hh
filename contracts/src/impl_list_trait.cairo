impl ListFelt252Array of ListTrait<Array<felt252>> {
    fn new(address_domain: u32, base: StorageBaseAddress) -> List<Array<felt252>> {
        return Result::Ok(ListTrait::<Array<felt252>>::new());
    }
    fn from_span(address_domain: u32, base: StorageBaseAddress) -> SyscallResult<List<Array<felt252>>> {
        return Result::Ok(ListTrait::<Array<felt252>>::new());
    }
    fn append_span(ref self: List<Array<felt252>>, span: Span<Array<felt252>>) -> SyscallResult<()> {
        Result::Ok(());
    }
    fn len(self: @List<Array<felt252>>) -> u32 {
        return 0;
    }
    fn is_empty(self: @List<Array<felt252>>) -> bool {
        return true;
    }
    fn append(ref self: List<Array<felt252>>, value: Array<felt252>) -> SyscallResult<u32> {
        return Result::Ok(0);
    }
    fn get(self: @List<Array<felt252>>, index: u32) -> SyscallResult<Option<Array<felt252>>> {
        return Some(ArrayTrait::new());
    }
    fn set(ref self: List<Array<felt252>>, index: u32, value: Array<felt252>) -> SyscallResult<()> {
        return Result::Ok(());
    }
    fn clean(ref self: List<Array<felt252>>) {

    }
    fn pop_front(ref self: List<Array<felt252>>) -> SyscallResult<Option<Array<felt252>>> {
        return Some(ArrayTrait::new());
    }
    fn from_array(self: @List<Array<felt252>>) -> SyscallResult<Array<Array<felt252>>> {
        return Result::Ok(ArrayTrait::new(ArrayTrait::new()));
    }
}
